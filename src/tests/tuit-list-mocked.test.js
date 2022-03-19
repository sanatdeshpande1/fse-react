import Tuits from "../components/tuits/index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

jest.mock("axios");

const MOCKED_USERS = [
  {
    _id: "234",
    username: "delta",
    password: "test",
    email: "delta@alice.com",
  },
  {
    _id: "456",
    username: "gamma",
    password: "test",
    email: "gamma@bob.com",
  },
  {
    _id: "789",
    username: "xeta",
    password: "test",
    email: "charlie@chaplin.com",
  },
];

const MOCKED_TUITS = [
  { _id: "123", tuit: "alice's tuit", postedBy: MOCKED_USERS[0] },
  { _id: "345", tuit: "bob's tuit", postedBy: MOCKED_USERS[1] },
  { _id: "567", tuit: "charlie's tuit", postedBy: MOCKED_USERS[2] },
];

test("tuit list renders mocked", async () => {
  // TODO: implement this
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { tuits: MOCKED_TUITS } })
  );
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );

  const user = screen.getByText(/alice's tuit/i);
  expect(user).toBeInTheDocument();
});
