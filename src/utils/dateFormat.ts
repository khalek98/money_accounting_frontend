import moment, { MomentInput } from "moment";

interface IDateFormat {
  (date: MomentInput): string;
}

export const dateFormat: IDateFormat = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
