echo "Start.."
npm run build
echo "Upload to serve run.sh"
scp -r run-react.sh root@5.180.182.235:/root/run/
echo "remove old project"
ssh root@5.180.182.235 'bash run/run-react.sh'

echo "Upload to server"
scp -r build/* root@5.180.182.235:/var/www/html/react/
