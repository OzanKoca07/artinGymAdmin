import React from "react";
import { Navigate } from "react-router-dom";

type Role = "SUPER_ADMIN" | "COMPANY_ADMIN";

interface RoleGuardProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
    const rawUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (!rawUser || !token) {
        return <Navigate to="/login" replace />;
    }

    let user: { role?: Role };
    try {
        user = JSON.parse(rawUser);
    } catch {
        return <Navigate to="/login" replace />;
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}
