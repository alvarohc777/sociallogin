FROM python:3.12.1-alpine3.19
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./sociallogin/ /code/


# docker build --pull --rm -f "Dockerfile" -t radowski.backend:v1.5 "."
# docker image push radowski.azurecr.io/radowski.backend:v1.5 