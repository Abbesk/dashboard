import requests
from django.conf import settings

EADMIN_BACK_API_URL = getattr(settings, "EADMIN_BACK_API_URL", "")

def error_response_util(context: str, details: str):
    return {"error_context": context, "details": str(details)}

def get_fullname(user_id, token):
    fullname = ""
    if not user_id or not token:
        return fullname

    headers = {"Authorization": f"Bearer {token.replace('Bearer ', '')}"}

    try:
        resp = requests.get(f"{EADMIN_BACK_API_URL}/users/{user_id}/", headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        fullname = f"{data.get('first_name', '')} {data.get('last_name', '')}".strip()
    except requests.exceptions.HTTPError as e:
        print(f"[HTTPError] get_fullname() user_id={user_id}: {e}")
    except requests.exceptions.ConnectionError as e:
        print(f"[ConnectionError] get_fullname() user_id={user_id}: {e}")
    except requests.exceptions.Timeout as e:
        print(f"[Timeout] get_fullname() user_id={user_id}: {e}")
    except requests.exceptions.RequestException as e:
        print(f"[RequestException] get_fullname() user_id={user_id}: {e}")
    except Exception as e:
        print(f"[UnexpectedError] get_fullname() user_id={user_id}: {e}")

    return fullname


