const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('./protos/user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDef).user;

const client = new userProto.UserService('user-service:50051', grpc.credentials.createInsecure());

const call = client.UserConnectedStream({}); // ouvre le flux

lastConnectedUser = ""

function startGRPCClient() {
  const call = client.UserConnectedStream({}); // ouvre le flux
  call.on('data', (user) => {
    console.log('Utilisateur connecté :', user.username);
    lastConnectedUser = user.username;
  });

  call.on('error', (err) => {
    console.error('Erreur gRPC:', err);
  });
}

function getLastConnectedUser() {
  return lastConnectedUser;
}

module.exports = { getLastConnectedUser , startGRPCClient}; 