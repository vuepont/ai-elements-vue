<script setup lang="ts">
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from '@repo/elements/package-info'
</script>

<template>
  <div class="flex flex-col gap-4">
    <PackageInfo
      change-type="major"
      current-version="18.2.0"
      name="react"
      new-version="19.0.0"
    >
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
      </PackageInfoHeader>
      <PackageInfoVersion />
      <PackageInfoDescription>
        A JavaScript library for building user interfaces.
      </PackageInfoDescription>
      <PackageInfoContent>
        <PackageInfoDependencies>
          <PackageInfoDependency name="react-dom" version="^19.0.0" />
          <PackageInfoDependency name="scheduler" version="^0.24.0" />
        </PackageInfoDependencies>
      </PackageInfoContent>
    </PackageInfo>

    <PackageInfo change-type="added" name="lodash">
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
      </PackageInfoHeader>
      <PackageInfoVersion />
    </PackageInfo>

    <PackageInfo change-type="removed" current-version="2.29.4" name="moment" />
  </div>
</template>
