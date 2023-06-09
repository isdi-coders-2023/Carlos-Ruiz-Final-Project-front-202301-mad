/* eslint-disable jsx-a11y/no-redundant-roles */
import styles from "./register.module.scss";

import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hooks/use-users";
import { User } from "../../model/user";
import { UsersRepo } from "../../services/user-repo";

type logProp = {
  setInLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Register({ setInLogin }: logProp) {
  const repo = useMemo(() => new UsersRepo(), []);

  const { userRegister } = useUsers(repo);

  const handlerSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUser = event.currentTarget;

    const registerForm: Partial<User> = {
      username: (formUser.elements[0] as HTMLFormElement).value,
      email: (formUser.elements[1] as HTMLFormElement).value,
      password: (formUser.elements[2] as HTMLFormElement).value,
    };
    const avatar = (formUser.elements[3] as HTMLFormElement).files?.item(0);
    userRegister(registerForm, avatar);

    formUser.reset();
    setInLogin(true);
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.container}>
      <label>
        USERNAME
        <input type="text" name="text" required />
      </label>
      <label>
        EMAIL
        <input type="email" name="email" required />
      </label>
      <label>
        PASSWORD
        <input type="password" name="password" role="textbox" required />
      </label>
      <label>
        AVATAR
        <input type="file" name="image" />
      </label>
      <button className={styles.submit} type="submit">
        REGISTER
      </button>
    </form>
  );
}
