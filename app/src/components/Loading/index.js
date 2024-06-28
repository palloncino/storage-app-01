import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Loading;
