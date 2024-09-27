function ProgressBar({progress}) {
    return (
    <div className="progress fixed-top" style={{ height: "2px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
    </div>
    )
}

export default ProgressBar;