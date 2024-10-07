import i18next from "i18next";
import { toast } from "react-toastify";

export const makeFullScreen = (el) => {
  el.style.height = `${document.documentElement.clientHeight - 1 - el.offsetTop}px`;
  if (el.parentElement != null) makeFullScreen(el.parentElement);
};

export const onQueryStartedErrorToast = async (_, { queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (e) {
    console.error(e);
    toast(i18next.t("browserError"));
  }
};