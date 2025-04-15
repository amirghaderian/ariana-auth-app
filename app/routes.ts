import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("login","routes/login/Login.jsx" ),
  route("register", "routes/register/Register.jsx"),
  layout("routes/protectedRoutes/protectedRoutes.jsx", [
    route("dashboard", "routes/dashboard/Dashboard.jsx"),
  ]),
] satisfies RouteConfig;
