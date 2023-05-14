## Steps to get going:
The default setup is to develop inside the docker container. This prevents you from needing to install the dependencies locally.

1. source scripts/setenv.sh
2. `mkdir secrets`
3. Copy necessary secret files into secrets (see docker-compose.yml for names)
4. `docker-compose up -d`
5. To attach in CLI: `scripts/attach_container.sh`
6. Else can attach in VS-Code using dev containers (see the VS Code docs: [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers)
7. To stop container: `docker stop tic-tac-toe`
8. To start: `docker start tic-tac-toe`
9. To remove: `docker-compose down`

After adding significant changes and creating a PR you will want to rebuild the image and update the version number. This would require updating the version number in the docker-compose file as well.

## Developing Locally
If for whatever reason you prefer to develop locally instead of inside the container, there are a few changes you will need to make:
1. Create a directory in the root of the repo called `run/secrets/`. You will add all the secrets here. Note this is already excluded from git as we globally exclude `secrets`.
2. On [line 3 of `secret_reader.js`](https://github.com/Jacob-Levitan/tic-tac-toe/blob/5773269c6afbe734f099ac74a859dc60c65e450c/server/secret_reader.js#L3) you will need to change the directory to be relative to the repo root instead of the machine root. Instead of `/run/secrets` the path should be `./run/secrets`.
3. [Line 5 of connection.js](https://github.com/Jacob-Levitan/tic-tac-toe/blob/5773269c6afbe734f099ac74a859dc60c65e450c/db/connection.js#L5) references an enviornment variable which is defined in the docker-compose.yml when starting the container. When running the server locally you will need to define this locally. This can be accomplished via the CLI command: `export DB_URI=tic-tac-toe.blziyjp.mongodb.net/tic-tac-toe`. You will need to execute this again if you close the terminal instance.
