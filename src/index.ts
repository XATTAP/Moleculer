import "dotenv/config"
import { ServiceBroker, ServiceSchema } from "moleculer";
import HttpService from "moleculer-web";
import UserService from "./users/user.service";

// Создаем сервисный брокер
const brokerGateway = new ServiceBroker({
  nodeID: "node-gateway",
  transporter: "NATS",
  hotReload: true,
  logLevel: "info"
});

// Включаем HTTP сервис
brokerGateway.createService({
  name: "gateway",
  mixins: [HttpService],
  routes: [
    {
      use: [
        {
          handler(req, res) {
            this.broker.call(req.$action, req.params)
              .then(result => res.send(result))
              .catch(err => res.status(500).send(err));
          },
        },
      ],
      settings: {
        routes: {
          path: "/",
          whitelist: [
            "users/**"
          ],
          autoAliases: true
        }
      }
    }
  ]
});

brokerGateway.createService(UserService);

brokerGateway.start()
  .then(() => {
    console.log("Брокер запущен");
  })
  .catch(err => {
    console.error("Ошибка запуска брокера:", err);
  });
