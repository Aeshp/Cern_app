FROM python:3.9

RUN useradd -m -u 1000 user
USER user


ENV HOME=/home/user
ENV HF_HOME=/home/user/.cache

ENV PATH="/home/user/.local/bin:${PATH}"


WORKDIR /home/user/app


COPY --chown=user:user ./requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt


COPY --chown=user:user ./main.py .


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]