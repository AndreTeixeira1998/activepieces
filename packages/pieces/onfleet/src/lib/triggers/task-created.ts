import { TriggerStrategy, WebhookHandshakeStrategy, createTrigger } from "@activepieces/pieces-framework";
import { common, OnfleetWebhookTriggers } from "../common";
import { onfleetAuth } from "../..";

export const taskCreated = createTrigger({
    auth: onfleetAuth,
    name: 'task_created',
    displayName: 'Task Created',
    description: 'Triggers when a task is created',
    type: TriggerStrategy.WEBHOOK,
    props: {},
    //Create the webhook and save the webhook ID in store for disable behavior
    async onEnable(context) {
        const webhookId = await common.subscribeWebhook(context.auth, context.webhookUrl, OnfleetWebhookTriggers.TASK_CREATED);

        await context.store?.put('_task_created_trigger', {
            webhookId: webhookId,
        });
    },
    //Delete the webhook
    async onDisable(context) {
        const response: any = await context.store?.get(
            '_task_created_trigger'
        );

        if (response !== null && response !== undefined) {
            await common.unsubscribeWebhook(context.auth, response.webhookId);
        }
    },
    //Return task
    async run(context) {
        return {
            payload: [context.payload.body],
        };
    },

    handshakeConfiguration: {
        strategy: WebhookHandshakeStrategy.QUERY_PRESENT,
        paramName: 'check'
    },

    async onHandshake(context) {
        return {
            status: 200,
            body: context.payload.queryParams['check']
        };
    },

    sampleData: {
        "actionContext": {
            "id": "vjw*RDMKDljKVDve1Vtcplgu",
            "type": "ADMIN"
        },
        "adminId": "vjw*RDMKDljKVDve1Vtcplgu",
        "data": {
            "task": {
                "appearance": {
                    "triangleColor": null
                },
                "completeAfter": 1612987200000,
                "completeBefore": 1613008800000,
                "completionDetails": {
                    "actions": [],
                    "events": [],
                    "failureNotes": "",
                    "failureReason": "NONE",
                    "firstLocation": [],
                    "lastLocation": [],
                    "time": null,
                    "unavailableAttachments": []
                },
                "container": {
                    "type": "WORKER",
                    "worker": "COwfwH~Zogm1LXIZYbPlLAyw"
                },
                "creator": "vjw*RDMKDljKVDve1Vtcplgu",
                "delayTime": null,
                "dependencies": [],
                "destination": {
                    "address": {
                        "apartment": "",
                        "city": "Anaheim",
                        "country": "United States",
                        "name": "Honda Center",
                        "number": "2695",
                        "postalCode": "92806",
                        "state": "California",
                        "street": "East Katella Avenue"
                    },
                    "id": "I5rMyWx4YHDcMGIwfD3TL8nf",
                    "location": [
                        -117.8764687,
                        33.8078476
                    ],
                    "metadata": [],
                    "notes": "This is a destination note",
                    "timeCreated": 1613002583000,
                    "timeLastModified": 1613002583913
                },
                "estimatedArrivalTime": null,
                "estimatedCompletionTime": null,
                "executor": "nYrkNP6jZMSKgBwG9qG7ci3J",
                "feedback": [],
                "id": "txiK2xHBIaUwAKB~BJrjscKu",
                "identity": {
                    "checksum": null,
                    "failedScanCount": 0
                },
                "merchant": "nYrkNP6jZMSKgBwG9qG7ci3J",
                "metadata": [],
                "notes": "This is a Task note",
                "organization": "nYrkNP6jZMSKgBwG9qG7ci3J",
                "overrides": {},
                "pickupTask": false,
                "quantity": 1,
                "recipients": [
                    {
                        "id": "A~pBTrc5~dTMBBImswg7U4YT",
                        "metadata": [],
                        "name": "Test User One",
                        "notes": "This is a recipient note",
                        "organization": "nYrkNP6jZMSKgBwG9qG7ci3J",
                        "phone": "+17145554231",
                        "skipSMSNotifications": false,
                        "timeCreated": 1613002583000,
                        "timeLastModified": 1613002583931
                    }
                ],
                "serviceTime": 3,
                "shortId": "fab829cf",
                "state": 1,
                "timeCreated": 1613002583000,
                "timeLastModified": 1613002583970,
                "trackingURL": "https://onf.lt/fab829cf81",
                "trackingViewed": false,
                "worker": "COwfwH~Zogm1LXIZYbPlLAyw"
            }
        },
        "taskId": "txiK2xHBIaUwAKB~BJrjscKu",
        "time": 1613002584051,
        "triggerId": 6,
        "triggerName": "taskCreated",
        "workerId": null
    }
})
