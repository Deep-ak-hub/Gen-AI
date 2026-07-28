import fs from "fs"

export const randomStringGenerator = (length = 50) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = chars.length;
  let random = "";
  for (let i = 0; i < length; i++) {
    let position = Math.ceil(Math.random() * (len - 1));
    random += chars[position];
  }
  return random;
};

export const fileDelete = (path) => {
  if (fs.existsSync(path)) {
    return fs.unlinkSync(path);
  }
  return false;
};

export const createDate = (date, days) => {
  // "2025-04-01" => Date Obj => getTime() => timestamp + daysin Timestamp =>
  date = new Date(date);
  date = new Date(date.getTime() + days * 86400000);
  return date;
};
