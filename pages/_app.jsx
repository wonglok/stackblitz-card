import '../style/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
        <Component {...pageProps} />
    </>
  );
};

export default App;
