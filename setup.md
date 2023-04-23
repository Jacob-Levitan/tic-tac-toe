## Steps to get going:

1. source scripts/setenv.sh
2. mkdir secrets
3. Copy necessary secret files into secrets (see docker-compose.yml for names)
4. docker-compose up -d
5. To attach in CLI: scripts/attach_container.sh
6. Else can attach in VS-Code
7. To stop container: docker stop tic-tac-toe
8. To start: docker start tic-tac-toe
9. To remove: docker-compose down
