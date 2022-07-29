import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { GoogleLogo, SignIn as SignInIcon ,SignOut } from "phosphor-react";

import "./styles.scss";

export function SigIn() {
  const [user, setUser] = useState<User>();

  async function handleGoogleSigIn() {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.log(error));
  }

  async function handleSignOut() {
    signOut(auth)
      .then(() => setUser(undefined))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
    });

    return unsubscriber;
  }, []);

  return (
    <div className="container">
      {user ? (
        <div className="user">
          {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}
          <strong>{user.displayName}</strong>
          <small>{user.email}</small>
        </div>
      ) : (
        <SignInIcon className="signin-icon" />
      )}

      <h1>Acesse sua conta</h1>

      <span>
        Utilizando autenticação social, por exemplo, autenticação Google, <br />
        você melhora a experiência do usuário permitindo usar sua aplicação sem
        precisar fazer um cadastro.
      </span>

      {!user ? (
        <button
          type="button"
          className="button-signin"
          onClick={handleGoogleSigIn}
        >
          <GoogleLogo />
          Entrar com o Google
        </button>
      ) : (
        <button
          type="button"
          className="button-signout"
          onClick={handleSignOut}
        >
          <SignOut />
          Sair
        </button>
      )}
    </div>
  );
}
