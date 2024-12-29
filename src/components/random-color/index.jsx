import { useEffect, useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");
  const [colorHistory, setColorHistory] = useState([]);
  const [showCopied, setShowCopied] = useState(false);

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHexColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    updateColor(hexColor);
  }

  function handleCreateRandomRgbColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    updateColor(`rgb(${r}, ${g}, ${b})`);
  }

  function updateColor(newColor) {
    setColor(newColor);
    setColorHistory(prev => [...prev.slice(-9), newColor]);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(color);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }

  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRgbColor();
    else handleCreateRandomHexColor();
  }, [typeOfColor]);

  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
        transition: "background 0.5s ease",
        position: "relative",
      }}
    >
      {/* Notification */}
      {showCopied && (
        <div style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "#22c55e",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          animation: "fadeIn 0.3s ease"
        }}>
          Color copied to clipboard!
        </div>
      )}

      {/* Main Content */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3rem",
      }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setTypeOfColor("hex")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "500",
              background: typeOfColor === "hex" ? "white" : "rgba(0,0,0,0.3)",
              color: typeOfColor === "hex" ? "black" : "white",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            HEX
          </button>
          <button
            onClick={() => setTypeOfColor("rgb")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "500",
              background: typeOfColor === "rgb" ? "white" : "rgba(0,0,0,0.3)",
              color: typeOfColor === "rgb" ? "black" : "white",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            RGB
          </button>
        </div>

        <button
          onClick={typeOfColor === "hex" ? handleCreateRandomHexColor : handleCreateRandomRgbColor}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            background: "white",
            color: "black",
            border: "none",
            borderRadius: "9999px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease"
          }}
        >
          Generate Random Color
        </button>

        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "500", 
            color: "white",
            marginBottom: "1rem"
          }}>
            {typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}
          </h3>
          <div 
            onClick={copyToClipboard}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bold",
              color: "white",
              background: "rgba(0,0,0,0.2)",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
          >
            {color}
          </div>
        </div>

        {/* Color History */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center"
        }}>
          <h4 style={{ color: "white", marginBottom: "1rem", fontWeight: "500" }}>
            Color History
          </h4>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {colorHistory.map((historicColor, index) => (
              <div
                key={index}
                onClick={() => setColor(historicColor)}
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.5rem",
                  background: historicColor,
                  cursor: "pointer",
                  transition: "transform 0.2s ease"
                }}
                title={historicColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}