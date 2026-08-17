import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Брендированная OG-картинка по умолчанию (для превью в соцсетях/мессенджерах).
 * Это не фотография изделия и не выдаётся за реальный кейс — просто
 * текстовая карточка бренда на фирменных цветах, сгенерированная кодом.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#16160F",
          color: "#F2F0EA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 72, fontWeight: 700 }}>
          <span>3Dpoint</span>
          <span style={{ color: "#E85D26", margin: "0 20px" }}>/</span>
          <span>3Дточка</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#9A978E", maxWidth: 900 }}>
          Изготовление и восстановление пластиковых деталей под ключ
        </div>
      </div>
    ),
    { ...size }
  );
}
