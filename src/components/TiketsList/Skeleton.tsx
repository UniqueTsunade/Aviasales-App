import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={502}
    height={184}
    viewBox="0 0 462 144"
    backgroundColor="#e6e5e5"
    foregroundColor="#cecaca"
    style={{
      borderRadius: "5px",
      backgroundColor: "#fff",
      marginBottom: "14px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <rect x="20" y="20" rx="10" ry="10" width="140" height="24" />
    <rect x="20" y="64" rx="0" ry="0" width="105" height="39" />
    <rect x="20" y="110" rx="0" ry="0" width="105" height="39" />
    <rect x="180" y="64" rx="0" ry="0" width="105" height="39" />
    <rect x="180" y="110" rx="0" ry="0" width="105" height="39" />
    <rect x="340" y="64" rx="0" ry="0" width="105" height="39" />
    <rect x="350" y="20" rx="10" ry="10" width="90" height="36" />
    <rect x="340" y="110" rx="0" ry="0" width="105" height="39" />
  </ContentLoader>
);

export default Skeleton;
