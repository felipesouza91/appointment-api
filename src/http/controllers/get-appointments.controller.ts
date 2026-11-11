import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetAppointmentsUseCase } from "../../domain/use-cases/get-appointment-use-case";

interface Controller {
  execute: (req: FastifyRequest, replay: FastifyReply) => Promise<void>;
}

export class GetAppoitmentController implements Controller {
  constructor(private useCase: GetAppointmentsUseCase) {}

  async execute(req: FastifyRequest, replay: FastifyReply): Promise<void> {
    const userId = req.user.id;
    const result = await this.useCase.find(userId);
    replay.send(result);
  }
}
