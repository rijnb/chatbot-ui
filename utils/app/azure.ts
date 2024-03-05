// This is a temporary solution to the problem of finding the correct Azure deployment ID.

export const getAzureDeploymentIdForModelId = (deploymentId: string, modelId: string) => {
  // Replace part of '-' with correct model.
  if (deploymentId.includes("-")) {
    const prefix = deploymentId.split("-")[0]
    return prefix + "-" + modelId
  } else {
    return deploymentId
  }
}
