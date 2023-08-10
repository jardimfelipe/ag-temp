import create from "zustand";
import zukeeper from "zukeeper";

interface IUserState {
	user: {
		name: string;
		email: string;
		age: string;
		token: string;
	};
	login: () => void;
}

export const userStore = create<IUserState>(
	zukeeper((set: any) => ({
		user: {
			name: "",
			email: "",
			age: "",
			token: "",
		},
		login: () => set((state: any) => ({ user: state.user })),
	}))
);

window.store = userStore;
