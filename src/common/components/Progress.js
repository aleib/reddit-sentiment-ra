import CircularProgress from 'material-ui/lib/circular-progress';

class Progress extends React.Component {
  render() {
    return(
      <CircularProgress
        mode="indeterminate"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          margin: '30px auto',
          display: 'block',
          width: '60px',
          height: '66px'
        }}
      />
    )
  };
}

export default Progress;
