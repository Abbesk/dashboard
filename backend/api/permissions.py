from rest_framework.permissions import BasePermission

class HasRolePermission(BasePermission):
    def has_permission(self, request, view):
        payload = getattr(request, "user_payload", None)
        if not payload:
            return False

        roles_data = payload.get('roles', [])
        if not roles_data and hasattr(request, 'auth'):
            import jwt
            try:
                decoded = jwt.decode(request.auth, options={"verify_signature": False})
                roles_data = decoded.get('roles', [])
            except:
                return False

        user_roles = []
        for role in roles_data:
            if isinstance(role, dict) and 'name' in role:
                user_roles.append(role['name'])
            elif isinstance(role, str):
                user_roles.append(role)

        allowed_roles = getattr(view, 'allowed_roles', [])
        return any(role in allowed_roles for role in user_roles)
