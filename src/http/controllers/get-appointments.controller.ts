import type { GetAppointmentsUseCase } from "@src/domain/use-cases/get-appointment-use-case";
import type { ContainerInjection } from "@src/infra/cdi/cdi-config";
import type { FastifyReply, FastifyRequest } from "fastify";

export interface Controller {
  execute: (req: FastifyRequest, replay: FastifyReply) => Promise<void>;
}

export class GetAppoitmentController implements Controller, ContainerInjection {
  private readonly getAppointmentsUseCase: GetAppointmentsUseCase;
  constructor({
    getAppointmentsUseCase,
  }: {
    getAppointmentsUseCase: GetAppointmentsUseCase;
  }) {
    this.getAppointmentsUseCase = getAppointmentsUseCase;
  }

  async execute(req: FastifyRequest, replay: FastifyReply): Promise<void> {
    const userId = req.user.id;
    const result = await this.getAppointmentsUseCase.find(userId);
    replay.send(result);
  }

  dispose() {}
}
