import { AuthService } from './auth.service';
import { LoggerService } from './logger.service';
import { SorterService } from './sorter.service';
import { TrackByService } from './trackby.service';
import { ValidationService } from './validation.service';
import { FilterService } from './filter.service';
import { DataService } from './data.service';
import { EventBusService } from './event-bus.service';

export { AuthService } from './auth.service';
export { LoggerService } from './logger.service';
export { SorterService } from './sorter.service';
export { TrackByService } from './trackby.service';
export { ValidationService } from './validation.service';
export { FilterService } from './filter.service';
export { DataService } from './data.service';
export { EventBusService, EmitEvent, Events } from './event-bus.service';

export const Service = [AuthService, LoggerService, SorterService, TrackByService, ValidationService,
                        FilterService, DataService, EventBusService];


