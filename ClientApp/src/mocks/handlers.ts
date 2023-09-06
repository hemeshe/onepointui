import { rest } from "msw";

import { recentItems } from "./recent-items";

const mockAPI =
  "https://mnrv-def-pub-sbx-euw-100-appw-minerva-sbx.azurewebsites.net/api/History?PageNumber=1&PageSize=5&originFrom=dataingestion";

export const handlers = [
  rest.get(mockAPI, (req, res, ctx) => {
    const query = req.url.searchParams;
    const PageNumber = query.get("PageNumber");
    const PageSize = query.get("PageSize");
    const originFrom = query.get("originFrom");
    return res(ctx.json(recentItems));
  }),
];
