import styles from "./logged.module.scss";

import { useEffect } from "react";
import { ReservationsRepo } from "../../services/reservation-repo";
import { useReservations } from "../../hooks/use-reservations";
import { UsersRepo } from "../../services/user-repo";
import { useUsers } from "../../hooks/use-users";
import { ProfileCard } from "../profile-card/profile-card";

export function LoggedAccount() {
  const repoReservations = new ReservationsRepo();
  const repoUsers = new UsersRepo();
  const { reservations, reservationGetUser } =
    useReservations(repoReservations);
  const { users, userReadId } = useUsers(repoUsers);

  useEffect(() => {
    reservationGetUser(users.extraInfo.token!);
    userReadId(users.extraInfo.token!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={styles.info}>
        <div className={styles.content}>
          <img
            src={users.userLogged.avatar}
            alt={`Profile pic of: ${users.userLogged.username}`}
          ></img>
          <h2 className={styles.username}>{users.userLogged.username}</h2>
        </div>
      </section>
      <section className={styles.list}>
        <div className={styles.titlelist}>YOUR RESERVATIONS</div>
        <ul className={styles.ul}>
          {reservations.userReservations.map((item) => (
            <ProfileCard key={item.id} reserves={item} />
          ))}
        </ul>
      </section>
    </>
  );
}
