import { NextRequest, NextResponse } from "next/server";
import { hasCookie, getCookie } from "cookies-next";
const jwt = require("jsonwebtoken");

export default async function middleware(req, res) {
  console.log("in middleware");
  if (!hasCookie("access_token", req, res)) {
    return new NextResponse(
      JSON.stringify({ success: false, error: { ...err } }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const token = getCookie("access_token", { req, res });
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
      if (err) {
        return new NextResponse(
          JSON.stringify({ success: false, error: { ...err } }),
          {
            status: 400,
          }
        );
      } else if (decoded && decoded !== undefined) {
        return NextResponse.next();
      } else {
        return new NextResponse(
          JSON.stringify({ success: false, error: { ...err } }),
          {
            status: 400,
          }
        );
      }
    });
  }
}

export const config = {
  matcher: "/api/planner/(.*)",
};
