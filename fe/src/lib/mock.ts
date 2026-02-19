/**
 * This file contains mock data used for development and testing purposes.
 * Separating mock data from components keeps the component logic clean and focused on the UI.
 */

// Defines the data structure for a user profile
export interface UserProfile {
  name: string;
  role: string;
  id: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  avatarUrl: string;
  largeAvatarUrl: string;
}

// A constant holding the mock user data.
// This object is used in UI components like UserNav when no real user data is available.
export const USER_DATA: UserProfile = {
  name: "Nguyễn Minh Anh",
  role: "Học sinh xuất sắc",
  id: "88291",
  level: 15,
  currentXP: 1250,
  nextLevelXP: 1500,
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_QoIN7XB-ffpRpTv6Pj_1kMOwa7zjWNBeDCEoOC9nl31CkCYUwrscalAqleCo9c4QUTMK2jPATu3png6ITz1ID3OOO7mcgoTipPq7xcfArTkX5_sCKjxs16e-gKk0MFLD1UO2u1xOlPTjD_K6b37myxNmDXDusOiBibzFzAKcVEoNDTKAyNroCzF2rJFuivIid498pwSRGQwbRpwJChn1OVJ-gc-zSsxY2OEoZuL0RFR50grVVzv4IdX3n62fCYNfrol1dK1d1A5V",
  largeAvatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8dCwa3jKK4EohrTNkPJVGXkJZN21mP97uDOrS9WNEFOJGdrHZyHPk6eJB92k3Dchb3YXAKP14H5Scq-ASu90R74F02znh_i1Mayn0Dh2WZjn2aAzWr1iz7esw71IMfCFAW92h5FNC1W0CFrKji1nArxpVcmU6_l8pmpiB8v4_UYRJshxxzpFfVi4yc3mT4RoGwejp8hKGldeJ0-DAvgUmkLd5wiSKEE4iQvXDsOLRzmyhfCEM3osGct6ud1gQE1tfMR3YeK8oDI"
};
