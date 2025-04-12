// src/components/common/UserAvatar.tsx
type UserAvatarProps = {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
};

export function UserAvatar({ name, avatarUrl, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`${sizeClasses[size]}  hover:text-blue-600 transition-colors rounded-full bg-gray-200 flex items-center justify-center overflow-hidden`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium text-gray-600">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
