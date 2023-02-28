import styles from "./profile.module.css";

const Profile = ({ username, logout, firstName }) => {
  return (
    <div className={styles.profileBox}>
      <h1>Welcome {firstName}!</h1>
      {username && <button onClick={logout} className={styles.logout}>Logout</button>}
    </div>
  );
};

export default Profile;
