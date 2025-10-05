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
import { useState } from "react"

export function FieldChoiceCard() {
    const [isCheck, setIsCheck] = useState("");

    const handleCheck = (value: string) => {
        console.log(value);
        setIsCheck(value);
    }

    return (
        <>
            <h1 className="text-lg font-semibold px-7 py-3 pt-7">Categories</h1>
            <div className="w-full max-w-full pb-7 sm:p-7 sm:pt-0 grid gap-3 overflow-hidden overflow-x-scroll sm:overflow-auto sm:overflow-x-auto">
                <FieldGroup>
                    <FieldSet>
                        <RadioGroup onValueChange={handleCheck} value={isCheck} defaultValue="kubernetes" className="flex justify-center gap-4 px-5 sm:px-0">
                            <FieldLabel htmlFor="kubernetes-r2h">
                                <Field orientation="horizontal" className="cursor-pointer">
                                    <FieldContent className="w-[8rem] sm:w-full">
                                        <FieldTitle>Kubernetes</FieldTitle>
                                        <FieldDescription>
                                            Run GPU workloads on a K8s configured cluster.
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem className="hidden" value="kubernetes" id="kubernetes-r2h" />
                                </Field>
                            </FieldLabel>
                            <FieldLabel htmlFor="vm-z4k">
                                <Field orientation="horizontal" className="cursor-pointer">
                                    <FieldContent className="w-[8rem] sm:w-full">
                                        <FieldTitle>Virtual Machine</FieldTitle>
                                        <FieldDescription>
                                            Access a VM configured cluster to run GPU workloads.
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem className="hidden" value="vm" id="vm-z4k" />
                                </Field>
                            </FieldLabel>
                            <FieldLabel htmlFor="dessert">
                                <Field orientation="horizontal" className="cursor-pointer">
                                    <FieldContent className="w-[8rem] sm:w-full">
                                        <FieldTitle>Dessert</FieldTitle>
                                        <FieldDescription>
                                            Access a VM configured cluster to run GPU workloads.
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem className="hidden" value="dessert" id="dessert" />
                                </Field>
                            </FieldLabel>
                        </RadioGroup>
                    </FieldSet>
                </FieldGroup>
            </div>
        </>
    )
}
