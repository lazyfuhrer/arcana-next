import { useEffect } from "react";
import { useArcanaAuth } from "../../auth/useArcanaAuth";
import Loader from "../components/loader";
import { Info } from "../components/info";
import styles from "./index.module.css";

export default function IndexPage() {
  const { user, connect, isLoggedIn, loading, loginWithSocial, provider } = useArcanaAuth();
  const onConnectClick = async () => {
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
  };
  const onConnect = () => {
    console.log("connected");
  };
  useEffect(() => {
    provider.on("connect", onConnect);
    return () => {
      provider.removeListener("connect", onConnect);
    };
  }, [provider]);
  return (
    <>
      {loading && <Loader secondaryColor="#101010" strokeColor="#101010" />}
      {!loading && !isLoggedIn && (
        <button className={styles.Btn} onClick={onConnectClick}>
          Connect
        </button>
      )}
      {!loading && isLoggedIn && <Info info={user} />}
    </>
  );
}