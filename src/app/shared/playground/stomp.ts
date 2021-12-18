// var Stomp = require('stomp-client');
// var destination = '/queue/someQueueName';
// var client = new Stomp(
//   'b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com',
//   61614,
//   'exar',
//   'suppersecret'
// );

// client.connect(function (sessionId) {
//   client.subscribe(destination, function (body, headers) {
//     console.log('This is the body of a message on the subscribed queue:', body);
//   });

//   client.publish(destination, 'Oh herrow');
// });

// // AMQP
// // amqp+ssl://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:5671
// // STOMP
// // stomp+ssl://
// // MQTT
// // mqtt+ssl://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:8883
// // WSS
// // wss://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:61619

// import { Client } from '@stomp/stompjs';
// import WebSocket from 'websocket';

// Object.assign(global, { WebSocket: WebSocket.w3cwebsocket });

// const clientOptions: Partial<Client> = {
//   brokerURL: 'wss://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:61619',
//   connectHeaders: {
//     login: 'exar',
//     passcode: 'suppersecret',
//   },
//   debug: function (message) {
//     console.log(message, 'from debug');
//   },
//   onWebSocketClose: function (message) {
//     console.log('Reason: ', message.reason);
//   },
//   onWebSocketError: function () {
//     console.log('Web socket error');
//   },
//   onConnect: function (frame) {
//     console.log('Client connected to', frame.headers.server);
//   },
//   onDisconnect: function () {
//     console.log('Client disconnected');
//   },
//   onStompError: function (frame) {
//     console.log('Broker reported error: ' + frame.headers['message']);
//     console.log('Additional details: ' + frame.body);
//   },
//   reconnectDelay: 5000,
//   heartbeatIncoming: 4000,
//   heartbeatOutgoing: 4000,
// };

// const mqData = {
//   to: '+1...',
//   body: 'Hi Isaac! you won some bitcoin :)===>>>>>>>>>>>',
// };

// // create a STOMP client for ActiveMQ
// const stompClient = new Client(clientOptions);

// // connect with the broker
// // const activateStomp = () => stompClient.activate();
// // console.log("STOMP client activated...");

// stompClient.activate();

// // stompClient.onConnect = (frame) => {

// setTimeout(async () => {
//   console.log('is stomp connected ----', stompClient.connected);

//   console.log('!!!!!!!!!!!!!STOMP client publisher connected...');

//   // const pub = () =>
//   await stompClient.publish({
//     destination: 'debug.queue',
//     body: JSON.stringify(mqData),
//     // headers: {
//     //     'content-type': 'application/json',
//     //     AMQ_SCHEDULED_DELAY: 'AppointmentDateTime',
//     // },
//   });
//   console.log('!!!!!!!!!!!! publisher ...');
//   // stompClient.deactivate()
// }, 3000);

// pub()
// }

// // consumer.js

// // Node.js packages used to communicate with ActiveMQ
// // utilising WebSocket and STOMP protocols
// const StompJs = require('@stomp/stompjs');

// // Node.js package used to read environment variables
// require('dotenv').config();

// // creates a Twilio client
// const twilio = require('twilio')(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );
// await stompClient.activate()
// setTimeout(() => {
// const consumeOp = async () => {
//   const client = new Client(clientOptions);

//   // invoked for each received message
//   const onMessageCallback = (jsonMessage: { body: string }) => {
//     console.log(jsonMessage, 'here I am in subscriber callback ============>>>>>>>>>>>>');
//     // expecting JSON
//     try {
//       const jsonObj = JSON.parse(jsonMessage.body);
//       console.log(jsonObj.to, jsonObj.body);
//     } catch (err) {
//       console.log('Payload is not a JSON...');
//     }
//   };

//   // on connect subscribe to queue and consume messages
//   setTimeout(async () => {
//     console.log('is stomp connected ----', client.connected);

//     client.onConnect = async (frame) => {
//       console.log('STOMP client subscriber connected...', frame);

//       // the queue you're interested in is identified by "foo.bar"
//       const queue = 'default.key';
//       const headers = { ack: 'auto' };

//       await client.subscribe(queue, onMessageCallback, headers);
//     };
//   }, 5000);
// };
// consumeOp();
// console.log('we are rimed oute');
// }, 8000);

// ActiveMQ Web Console
// https://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:8162
// Endpoints
// OpenWire
// ssl://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:61617

// AMQP
// amqp+ssl://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:5671
// STOMP
// stomp+ssl://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:61614
// MQTT
// mqtt+ssl://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:8883
// WSS
// wss://b-33f76d48-18c9-4f37-a5ac-3797903f5ace-1.mq.eu-west-2.amazonaws.com:61619
