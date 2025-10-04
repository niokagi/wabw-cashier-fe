import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

export function FieldChoiceCard() {
    const menuData = [
        {
            name: "",
            price: "",
            stock: "",
        }
    ]

    return (
        <div className="w-full max-w-4xl p-7">
            <FieldGroup>
                <FieldSet>
                    <RadioGroup defaultValue="kubernetes" className="grid grid-cols-3 gap-4">
                        <FieldLabel htmlFor="kubernetes-r2h">
                            <Field orientation="horizontal" className="cursor-pointer">
                                <FieldContent>
                                    <FieldTitle>Kubernetes</FieldTitle>
                                    <FieldDescription>
                                        Run GPU workloads on a K8s configured cluster.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
                            </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="vm-z4k">
                            <Field orientation="horizontal" className="cursor-pointer">
                                <FieldContent>
                                    <FieldTitle>Virtual Machine</FieldTitle>
                                    <FieldDescription>
                                        Access a VM configured cluster to run GPU workloads.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="vm" id="vm-z4k" />
                            </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="dessert">
                            <Field orientation="horizontal" className="cursor-pointer">
                                <FieldContent>
                                    <FieldTitle>Dessert</FieldTitle>
                                    <FieldDescription>
                                        Access a VM configured cluster to run GPU workloads.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="dessert" id="dessert" />
                            </Field>
                        </FieldLabel>
                    </RadioGroup>
                </FieldSet>
            </FieldGroup>
        </div>
    )
}
