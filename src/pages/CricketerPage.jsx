// pages/CricktersPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import kebabCase from "lodash/kebabCase";
import getPlayers from "../data/getPlayers";
import PlayerDetail from "../components/PlayerDetail";
import useTitle from "../hooks/useTitle";
import PlayerBar from "../components/PlayerBar";

function CricketerPage() {
  const { cricketerId } = useParams();
  const [cricketer, setCricketer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [otherSimilarPlayers, setOtherSimilarPlayers] = useState([]);

  const formatDate = timestamp => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Player type correction as player type is missing for few players
  const formatPlayerType = type => {
    const typeMap = {
      allRounder: "All Rounder",
      batsman: "Batsman",
      bowler: "Bowler",
      wicketKeeper: "Wicket Keeper"
    };
    return typeMap[type] || "Not Specified";
  };

  useTitle({
    currLocation: location.pathname,
    path: `/all-cricketers/${cricketerId}`,
    docTitle: cricketer
      ? `${cricketer.name} - Cricketer Profile`
      : "Loading Profile - Cricketer App"
  });

  useEffect(
    () => {
      async function fetchCricketerData() {
        try {
          const allPlayers = await getPlayers();
          const foundCricketer = allPlayers.find(
            player =>
              kebabCase(player.name).toLowerCase() === cricketerId.toLowerCase()
          );

          if (foundCricketer) {
            setCricketer(foundCricketer);
            // find other similar players in the same useEffect hook to reduce rendering
            const others = allPlayers.filter(
              player =>
                player.type === foundCricketer.type &&
                player.id !== foundCricketer.id
            );
            setOtherSimilarPlayers(others);
          } else {
            navigate("/404");
          }
        } catch (error) {
          console.error("Error fetching cricketer:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchCricketerData();
    },
    [cricketerId, navigate]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] font-lexend">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!cricketer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black font-lexend">
      {/* Main player detail section with proper spacing */}
      <div className="container mx-auto px-4 py-10">
        <PlayerDetail
          cricketer={cricketer}
          formatPlayerType={formatPlayerType}
          formatDate={formatDate}
        />
      </div>

      {/* Similar players section with consistent styling */}
      <div className="flex flex-col items-center mb-20">
        {/* Section heading with proper spacing and text size */}
        <div className="w-full text-center mb-12">
          <h2 className="text-white text-5xl font-bold">
            Other{" "}
            {/* Filtering player types */}
            {cricketer.type === "allRounder"
              ? "All Rounders"
              : cricketer.type === "batsman"
                ? "Batsmen"
                : cricketer.type === "bowler"
                  ? "Bowlers"
                  : cricketer.type === "wicketKeeper" ? "Wicket Keepers" : ""}
          </h2>
        </div>

        {/* Player cards container with consistent width and spacing */}
        <div className="w-[75%] space-y-4">
        {/* Other similar players with same type */}
          {otherSimilarPlayers
            .filter(player => player.id !== cricketer.id)
            .map(player =>
              <PlayerBar
                key={player.id}
                playerName={player.name}
                playerPoints={player.points}
                dob={player.dob}
                playerType={
                  player.type === "allRounder"
                    ? "All Rounder"
                    : player.type === "batsman"
                      ? "Batsman"
                      : player.type === "bowler"
                        ? "Bowler"
                        : player.type === "wicketKeeper" ? "Wicket Keeper" : ""
                }
                highlightAttribute="none"
              />
            )}
        </div>

        {/* Bottom spacing for better visual balance */}
        <div className="h-16" />
      </div>
    </div>
  );
}

export default CricketerPage;
