import { connect } from 'mqtt';

const client = connect('mqtt://broker.hivemq.com:1883/');

client.on('connect', () => {
	client.subscribe('tnh/+/+', (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log('appartment;room;date;temperature;humidity');
		}
	});
});

client.on('message', (topic, message) => {
	// message is Buffer
	const payload = JSON.parse(message.toString()) as MeassurementPayload;
	const [_, appartment, room] = topic.split('/');
	console.log(`${appartment};${room};${new Date(payload.date * 1000).toISOString()};${Number(payload.temp).toFixed(2)};${Number(payload.humidity).toFixed(2)}`);
});

interface MeassurementPayload {
	humidity: number
	temp: number
	date: number
}
