import random
from datetime import datetime, timedelta

random.seed(42)

ips = [
    f"192.168.{random.randint(0, 255)}.{random.randint(1, 254)}"
    for _ in range(500)
]

methods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
paths = [
    "/", "/index.html", "/login", "/logout",
    "/api/users", "/api/products", "/api/orders",
    "/api/login", "/api/checkout", "/search",
    "/assets/style.css", "/assets/app.js",
    "/favicon.ico", "/health", "/dashboard",
    "/admin", "/api/notifications", "/contact",
    "/api/users/42", "/api/products/17"
]
statuses = [200, 200, 200, 201, 204, 301, 304, 400, 401, 403, 404, 429, 500, 502, 503]

def generate_logs(filename, count):
    with open(filename, "w", encoding="utf-8") as file:
        for _ in range(count):
            ip = random.choice(ips)
            method = random.choice(methods)
            path = random.choice(paths)
            status = random.choice(statuses)
            response_ms = random.randint(1, 999)

            file.write(
                f"{ip} {method} {path} "
                f"{status} {response_ms}ms\n"
            )

generate_logs("web_server_logs_1k.log", 1_000)
generate_logs("web_server_logs_100k.log", 100_000)

print("Generated both log files successfully.")
