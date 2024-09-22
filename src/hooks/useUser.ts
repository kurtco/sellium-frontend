import { useSession } from "next-auth/react";

interface User {
  name: string;
  email: string;
  image?: string;
}

export default function useUser() {
  const { data: session } = useSession();

  if (session) {
    const user: User = session.user;
    const provider = session?.provider;
    let thumb = user?.image;

    if (provider === "cognito") {
      const email = user?.email?.split("@");
      user.name = email ? email[0] : "John Doe";
    }

    if (!user?.image) {
      user.image = "/assets/images/users/avatar-1.png";
      thumb = "/assets/images/users/avatar-thumb-1.png";
    }

    const newUser = {
      name: user.name,
      email: user.email,
      avatar: user?.image,
      thumb,
      role: "UI/UX Designer",
    };

    return newUser;
  }

  return false;
}
