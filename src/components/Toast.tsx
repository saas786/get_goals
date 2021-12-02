export const presentToast = (
  message: string,
  duration = 4000,
  color?: string
) => {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = duration;
  toast.color = color;

  document.body.appendChild(toast);
  return toast.present();
};
