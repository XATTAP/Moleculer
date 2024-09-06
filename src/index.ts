import "dotenv/config"
import { ServiceBroker } from "moleculer";
import HttpService from "moleculer-web";
import TasksService from "./tasks/task.service";

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
            "tasks/**"
          ],
          autoAliases: true
        }
      }
    }
  ]
});

brokerGateway.createService(TasksService);

brokerGateway.start()
  .then(() => {
    console.log("Брокер запущен");
  })
  .catch(err => {
    console.error("Ошибка запуска брокера:", err);
  });
