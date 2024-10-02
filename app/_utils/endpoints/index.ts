import {
  backendService,
  auth,
  user,
  category,
  subcategory,
  items,
  merchant,
} from "./sub-endpoints";

export const appEndPoints = {
  ...auth,
  ...user,
  UPDATE_DELIVERY_AREA: `${backendService}delivery-area`,
  GET_ALL_DELIVERY_AREAS: `${backendService}delivery-area`,
  ...category,
  ...subcategory,
  ...items,
  ...merchant,
};

const webSocketService = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`;

export const webSocketEndPoints = {
  CHAT: `${webSocketService}chat`,
};

export enum socketEvents {
  initiateMerchantAdminChat = "initiate-merchant-admin-chat",
  sendMerchantAdminChatMsg = "merchant-admin-chat-msg",
}
