export default function CanvaBackground() {
  return (
    <div
      style={{
        position: "fixed",   // pour qu'il couvre tout le viewport
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,          // derrière tout le contenu
        overflow: "hidden",
      }}
    >
      <iframe
        loading="lazy"
        src="https://www.canva.com/design/DAG_bq-2C9I/cW8WLh5gm1WvpmCINz4-YA/view?embed"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
}
