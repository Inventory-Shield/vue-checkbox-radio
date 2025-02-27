<style lang="scss">
    .checkbox-component {
        > input {
            opacity: 0;
            position: absolute;

            + label > .input-box {
                display: inline-block;
                border: 1px solid #000;
                border-radius: 14%;
                margin: 0;
                padding: 0;
                width: 1em;
                height: 1em;
                background: #fff;
                overflow: hidden;
                vertical-align: -5%;
                user-select: none;

                > .input-box-tick {
                    width: 100%;
                    height: 100%;

                    > path {
                        opacity: 0;
                        stroke: #000;
                        stroke-width: 2.3px;
                        stroke-dashoffset: 20;
                        stroke-dasharray: 20;
                        transition: stroke-dashoffset 0.15s ease-in;
                    }
                }
            }

            &:checked + label > .input-box > .input-box-tick > path {
                opacity: 1;
                stroke-dashoffset: 0;
            }

            &:focus + label > .input-box {
                box-shadow: 0 0 2px 3px rgba(115, 185, 255, 0.69);
            }

            &:disabled + label {
                opacity: 0.7;
            }
        }
    }
</style>

<template>
    <div class="checkbox-component">
        <input type="checkbox"
               :id="id"
               :name="name"
               :value="value"
               :class="className"
               :required="required"
               :disabled="disabled"
               @change="onChange"
               :checked="state">
        <label :for="id">
            <slot name="input-box">
                <span class="input-box">
                    <svg class="input-box-tick" viewBox="0 0 16 16">
                        <path fill="none" d="M1.7,7.8l3.8,3.4l9-8.8"></path>
                    </svg>
                </span>
            </slot>
            <slot></slot>
        </label>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';

    export default defineComponent({
        props: {
            id: {
                type: String,
                default: function () {
                    return 'checkbox-id-' + Math.random() * 300;
                },
            },
            name: {
                type: String as PropType<string | null>,
                default: null,
            },
            value: {
                default: null,
            },
            modelValue: {
                default: undefined,
            },
            className: {
                type: String as PropType<string | null>,
                default: null,
            },
            checked: {
                type: Boolean,
                default: false,
            },
            required: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            model: {}
        },

        emits: ['update:modelValue'],

        computed: {
            state(): boolean {
                if (this.modelValue === undefined) {
                    return this.checked;
                }

                if (Array.isArray(this.modelValue)) {
                    return (this.modelValue as unknown as any[]).indexOf(this.value) > -1;
                }

                return !!this.modelValue;
            }
        },

        methods: {
            onChange(): void {
                this.toggle();
            },

            toggle(): void {
                let value;

                if (Array.isArray(this.modelValue)) {
                    value = (this.modelValue as unknown as any[]).slice(0);

                    if (this.state) {
                        value.splice(value.indexOf(this.value), 1);
                    } else {
                        value.push(this.value);
                    }
                } else {
                    value = !this.state;
                }

                this.$emit('update:modelValue', value);
            }
        },

        watch: {
            checked(newValue: boolean) {
                if (newValue !== this.state) {
                    this.toggle();
                }
            }
        },

        mounted() {
            if (this.checked && !this.state) {
                this.toggle();
            }
        },
    });
</script>
