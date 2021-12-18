/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @rabbitClient
 * @uses "amqp-connection-manager": "^3.2.2",
 * @uses "amqplib": "^0.7.1",
 */

import amqp from 'amqp-connection-manager';
import config from '../../../infra/config';

// Create a connetion manager
const connection = amqp.connect([config.AMQP_URI]);
connection.on('connect', () => console.log('SUCCESSFULLY CONNECTED TO RABBITMQ SERVER !'));
connection.on('disconnect', (err: Error) => console.log('Disconnected.', err));

export const Publisher = async (queue: string, message: any) => {
  await connection
    .createChannel({
      json: true,
      setup: function (channel: any) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        // Note that `this` here is the channelWrapper instance.
        return channel.assertQueue(queue, { durable: true });
      },
    })
    .sendToQueue(queue, message)
    .then(function () {
      return console.log('Message was sent to : ', queue);
    })
    .catch(function (err: Error) {
      return console.log(err);
    });
};

export const Subscriber = async (queue: string) => {
  // Handle an incomming message.
  const decodeMSG = (data: any) => {
    const message = JSON.parse(data.content.toString());
    console.log('subscriber: got message', message);
    channelWrapper.ack(data);
  };

  // Set up a channel listening for messages in the queue.
  const channelWrapper = connection.createChannel({
    setup: function (channel: any) {
      // `channel` here is a regular amqplib `ConfirmChannel`.
      // Note that `this` here is the channelWrapper instance.
      return Promise.all([channel.assertQueue(queue), channel.prefetch(1), channel.consume(queue, decodeMSG)]);
    },
  });

  await channelWrapper.waitForConnect().then(function () {
    console.log('Listening for messages');
  });
};

/**
 * ALL TESTS SUCCEDED
 */

const queue = 'ACCOUNT_VERIFICATION';

// Publisher(queue, 'Halleluyah')
Publisher(queue, { msg: 'Halleluyah' });
Subscriber(queue);
