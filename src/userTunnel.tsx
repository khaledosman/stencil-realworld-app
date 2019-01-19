import { createProviderConsumer } from "@stencil/state-tunnel";

export interface IUser {
  id: number;
  email: string;
  username: string;
  updatedAt: string;
  createdAt: string;
  token: string;
  bio?: string;
  image?: string;
}

export interface IUserState {
  user?: IUser;
}

export default createProviderConsumer<IUserState>({}, (subscribe, child) => (
  <context-consumer subscribe={subscribe} renderer={child} />
));
